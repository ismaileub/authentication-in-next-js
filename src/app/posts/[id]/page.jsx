import React from 'react';

const getSinglePost = async (postId) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const data = await res.json();
    return data;
}


export async function generateMetadata({ params }) {
    // read route params
    const { id } = await params

    // fetch data
    const singlePost = await getSinglePost(id);



    return {
        title: singlePost.title,
        description: singlePost.body
    }
}



const SinglePost = async ({ params }) => {
    const p = await params;
    //console.log(p.id);
    const singlePost = await getSinglePost(p.id)
    return (
        <div>
            <div>
                <h2>Post Details</h2>
                <p><strong>User ID:</strong> {singlePost.userId}</p>
                <p><strong>Post ID:</strong> {singlePost.id}</p>
                <p><strong>Title:</strong> {singlePost.title}</p>
                <p><strong>Body:</strong> {singlePost.body}</p>
            </div>
        </div>
    );
};

export default SinglePost;