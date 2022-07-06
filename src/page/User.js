import React, { useContext, useEffect, useState } from "react";
import { AnimateSharedLayout, motion } from "framer-motion";
import {useNavigate } from 'react-router-dom';

import Image from '../components/image'
import AppContext from "../store/AppContext";
import {addToLocalStorage, checkLocalStorage, getlikedImages} from "../storage/storeImages";


export default function User() {
    const history = useNavigate ();
    const [isLoggedIn, user,, likedImages, setLikedImages] = useContext(AppContext)
    const userName= user.email? (user.email.substring(0, user.email.indexOf("@"))) : null;

    const [Images, setImages] = useState(['https://images.unsplash.com/photo-1616818400884-1c4f3d4d003c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfGFsbHw4fHx8fHx8Mnx8MTYxNjg1ODY3OQ&ixlib=rb-1.2.1&q=80&w=400',
    'https://images.unsplash.com/photo-1616156104743-0ed6f123d8b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfGFsbHw5fHx8fHx8Mnx8MTYxNjg1ODY3OQ&ixlib=rb-1.2.1&q=80&w=400','https://images.unsplash.com/photo-1616841888027-89693dec0827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfGFsbHwxMHx8fHx8fDJ8fDE2MTY4NTg2Nzk&ixlib=rb-1.2.1&q=80&w=400','https://images.unsplash.com/photo-1616732227193-6d556628ede1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfGFsbHwxMnx8fHx8fDJ8fDE2MTY4NTkxMDM&ixlib=rb-1.2.1&q=80&w=400'])

    const [showPreview, setShowPreview] = useState(false);

    const AnimationSettings = {
        transition: { duration: 0.5 },
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };
    if(!isLoggedIn){
        history("/", {replace:true})
    }
    
    function handleRemove(url){
        setLikedImages(likedImages.filter((image,i)=>image!==url))
    }

    useEffect(() => {
        if (!checkLocalStorage()) {
            setLikedImages(getlikedImages(userName))
        } else{
            addToLocalStorage(likedImages, userName)
        }
    }, [])

    useEffect(() => {
        addToLocalStorage(likedImages, userName)
    },[likedImages])

    function ShowImage(){
        return (
            <div className="container mx-auto p-2 flex flex-wrap">
                <AnimateSharedLayout type="switch" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                  likedImages?.map((image,index)=>(
                    <motion.div className="border-1 border-gray-300 rounded-xl p-1 bg-black-100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={index}
                        layoutId={index}>
                    <Image 
                        show={() => setShowPreview(index)}
                        image={image} 
                        handleRemove={handleRemove}
                        index={index}
                    />
                    </motion.div>))  
                }
                {!Images.length && "No images"}
                </AnimateSharedLayout>      
            </div>   
        )
    }

    return (
        <motion.div {...AnimationSettings}>
            <section className="flex justify-center">
                <div>
                {!!Images.length && <h1 className="text-4xl dark:text-white text-center">Liked photos</h1> }
                    <div className="text-center">
                        <ShowImage />
                    </div>
                </div>
            </section>
        </motion.div>
    )
}
