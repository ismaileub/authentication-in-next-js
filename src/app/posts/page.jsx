import Link from 'next/link';
import React from 'react';

const getPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    return data;
}

export const metadata = {
    title: "All posts",
    description: "Loading JSON placeholder posts using server components",
};

const Posts = async () => {

    const posts = await getPosts();
    return (
        // <div>
        //     {
        //         posts.map((singlePost) => {
        //             return (
        //                 <div key={singlePost.id}>
        //                     <p> {singlePost.id} </p>
        //                     <p>{singlePost.title}</p>
        //                     <p>{singlePost.body}</p>
        //                 </div>
        //             )
        //         })
        //     }
        // </div>
        <div className='space-y-8'>
            {
                posts.map((singlePost) => (

                    <div key={singlePost.id}>
                        <p> {singlePost.id} </p>
                        <p>{singlePost.title}</p>
                        <p>{singlePost.body}</p>
                        <Link className='p-2 bg-amber-200' href={`/posts/${singlePost.id}`}>Details</Link>
                    </div>
                )
                )
            }
        </div>
    );
};

export default Posts;