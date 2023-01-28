import { useState, useEffect } from "react";

import { Searchbar } from "./Searchbar";
import { ImageGallery } from "./ImageGallery";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { Loader } from "./Loader";
import { fetchImages } from "services/eventsApp.services"

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [imageDescription, setImageDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  
  const onSubmit = evt => {
    evt.preventDefault();

    const page = 1;
    const imageDescription = evt.target.elements['images-description'].value;

    setPage(page);
    setImageDescription(imageDescription);
    setPosts([]);
  }

  const onClickLoadMore = () => {
    setPage(page + 1);
  }

  const filterPostsData = (originalPosts) => {
    return originalPosts.map((post) => ({
      id: post.id,
      webformatURL: post.webformatURL,
      largeImageURL: post.largeImageURL
    }))
  }

  // eslint-disable-next-line
  useEffect(() => {
    if (!page) return;

    setIsLoading(true);

    fetchImages(imageDescription, page)
    .then(response => {
      const updatedPosts = posts.concat(filterPostsData(response.data.hits));

      setPosts(updatedPosts);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [imageDescription, page]);

  const onSelectPost = (postData) => {
    setSelectedPost(postData);
  }

  const onModalClose = () => {
    setSelectedPost(null);
  }

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      
      {!!posts.length && <ImageGallery items={posts} onSelectPost={onSelectPost} />}
      { isLoading && <Loader /> }

      {(!!page && !isLoading) && (
        <div className="loadMoreButton">
          <Button onClick={onClickLoadMore}>
            Load More
          </Button>
        </div>
      )}

      {selectedPost && (
        <Modal imageUrl={selectedPost.largeImageURL} onClose={onModalClose} />
      )}
    </div>
  );
};