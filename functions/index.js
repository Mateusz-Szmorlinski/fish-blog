/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const { FieldValue } = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const { onDocumentUpdated, onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onSchedule } = require("firebase-functions/v2/scheduler");

const express = require("express");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post("/addPost", async (req, res) => {
  const postData = req.body;

  try {
    const docRef = await db.collection("posts").add(postData);
    res.status(201).json({ id: docRef.id });
  } catch (err) {
    console.error("Błąd dodawania posta:", err);
    res.status(500).json({ error: "Wewnętrzny błąd serwera." });
  }
});

app.get("/getPostsTitles", async (req, res) => {
  try {
    const snapshot = await db.collection("posts").get();
    const posts = snapshot.docs.map(doc => doc.data().title).filter(Boolean);
    res.status(200).json(posts);
  } catch (err) {
    console.error("Błąd pobierania tytułów postów:", err);
    res.status(500).json({ error: "Wewnętrzny błąd serwera." });
  }
});

exports.api = functions.https.onRequest(app);

exports.lastUpdate = onDocumentUpdated("posts/{docID}", async (event) => {
    const beforeData = event.data.before.data();
    const afterData = event.data.after.data();

    const { lastUpdated: _, ...beforeRest } = beforeData || {};
    const { lastUpdated: __, ...afterRest } = afterData || {};

    const isMeaningfulChange = JSON.stringify(beforeRest) !== JSON.stringify(afterRest);
    if (!isMeaningfulChange) {
        return;
    }

    // Update lastUpdated field
    await event.data.after.ref.update({
      lastUpdated: FieldValue.serverTimestamp(),
    });
});

exports.updatePostCountOnAdd = onDocumentCreated("posts/{docID}", async (event) => {
    const postData = event.data.after.data();
    if (!postData || !postData.status) {
        return;
    }

    // Read current counts
    const countDocRef = admin.firestore().collection("postsCount").doc("postsCount");
    const countDoc = await countDocRef.get();
    let { totalPosts = 0, publishedPosts = 0, unpublishedPosts = 0 } = countDoc.exists ? countDoc.data() : {};

    // Increment counts based on status
    totalPosts += 1;
    if (postData.status === "published") {
        publishedPosts += 1;
    } else {
        unpublishedPosts += 1;
    }

    await countDocRef.set({
        totalPosts,
        publishedPosts,
        unpublishedPosts,
        lastUpdate: admin.firestore.FieldValue.serverTimestamp()
    });
});

exports.updatePostCount = onDocumentUpdated("posts/{docID}", async (event) => {
    const beforeData = event.data.before.data();
    const afterData = event.data.after.data();

    // Check if status changed
    const statusChanged = (beforeData?.status !== afterData?.status);
    if (!statusChanged) {
        return;
    }

    if (statusChanged) {
        // Read current counts
        const countDocRef = admin.firestore().collection("postsCount").doc("postsCount");
        const countDoc = await countDocRef.get();
        let { totalPosts = 0, publishedPosts = 0, unpublishedPosts = 0 } = countDoc.exists ? countDoc.data() : {};

        // Adjust counts based on status change
        if (!beforeData) {
            // New post added
            totalPosts += 1;
            if (afterData.status === "published") {
                publishedPosts += 1;
            } else {
                unpublishedPosts += 1;
            }
        } else if (!afterData) {
            // Post deleted
            totalPosts = Math.max(0, totalPosts - 1);
            if (beforeData.status === "published") {
                publishedPosts = Math.max(0, publishedPosts - 1);
            } else {
                unpublishedPosts = Math.max(0, unpublishedPosts - 1);
            }
        } else if (beforeData?.status === afterData?.status) {
            // Status unchanged, no adjustment needed
            return;
        } else if (beforeData?.status !== afterData?.status && beforeData?.status === "published") {
            // Post was published, now changed to unpublished
            publishedPosts = Math.max(0, publishedPosts - 1);
            unpublishedPosts += 1;
        } else if (beforeData?.status !== afterData?.status && beforeData?.status !== "published") {
            // Post was unpublished, now changed to published
            publishedPosts += 1;
            unpublishedPosts = Math.max(0, unpublishedPosts - 1);
        }
        // Ensure counts are non-negative
        totalPosts = Math.max(0, totalPosts);
        publishedPosts = Math.max(0, publishedPosts);
        unpublishedPosts = Math.max(0, unpublishedPosts); 
        // totalPosts remains unchanged

        await countDocRef.set({
            totalPosts,
            publishedPosts,
            unpublishedPosts,
            lastUpdate: admin.firestore.FieldValue.serverTimestamp()
        });
    }
});

exports.countPostsScheduled = onSchedule("every day 01:00", async (event) => {
  try {
    const allPostsSnap = await db.collection("posts").get();
    const totalPosts = allPostsSnap.size;

    const publishedSnap = await db.collection("posts")
      .where("status", "==", "published")
      .get();
    const publishedPosts = publishedSnap.size;

    const unpublishedSnap = await db.collection("posts")
      .where("status", "==", "unpublished")
      .get();
    const unpublishedPosts = unpublishedSnap.size;

    // Log the counts
    await db.collection("postsCount").doc("postsCount").set({
      totalPosts,
      publishedPosts,
      unpublishedPosts,
      lastUpdate: admin.firestore.FieldValue.serverTimestamp()
    });

  } catch (err) {
    await db.collection("logs").add({
      message: "Błąd podczas zliczania postów",
      error: err.message,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
  }
});