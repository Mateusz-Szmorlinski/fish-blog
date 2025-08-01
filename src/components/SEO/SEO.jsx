import React from 'react';
import { Helmet } from 'react-helmet-async';



function SEO({title, description, keywords}) {
    return (
        <Helmet>
            {title && title != "" && <title>{title}</title>}
            {description && description != "" && <meta name='description' content={description} />}
            {keywords && keywords != "" && <meta name="keywords" content={keywords}></meta>}
        </Helmet>
    )
}

export default SEO;