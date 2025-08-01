import "./ImageText.css";



function ImageText({ text, image, orientation}) {
    return (
        <p className="paragraph poppins-font"><img className={orientation} src={image}/>{text}</p>
    );
}

export default ImageText;