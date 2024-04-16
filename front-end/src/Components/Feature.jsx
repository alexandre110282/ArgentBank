import React from 'react';
import features from '../Data/Features.json';

const Feature = () => {
    return (

        <section className="features">
            <h2 className="sr-only">Features</h2>
                {features.map((feature, index) => {
                    return(
                        <div className="feature-item" key={index}>
                            <img src={feature.image} alt={feature.alt} className="feature-icon" />
                            <h3 className="feature-item-title">{feature.title}</h3>
                            <p>{feature.text}</p>
                        </div>
                    )
                })}                
        </section>                    
        
    );
};

export default Feature;