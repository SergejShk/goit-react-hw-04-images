import { getArticles } from 'services/apiService';
import Button from './button/Button';
import ImageGallery from './imageGallery/ImageGallery';
import Loader from './loader/Loader';
import Searchbar from './searchbar/Searchbar';
import s from './App.module.css';
import { notFound } from 'assets/notifications';
import Modal from './modal/Modal';
import { useState, useEffect } from 'react';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState([]);
  const [dataLargeImage, setDataLargeImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (searchQuery === '') return;

    setIsLoading(true);

    getArticles(searchQuery, page)
      .then(data => {
        setSearchData(prev => [...prev, ...data.hits]);
      })
      .catch(err => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [searchQuery, page]);

  const onSubmitNewSearch = newSearchQuery => {
    setSearchQuery(newSearchQuery);
    setPage(1);
    setSearchData([]);
    setIsError(false);
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const onHandleClickImage = data => {
    setDataLargeImage(data);
    toogleModal();
  };

  const toogleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <div className={s.mainContainer}>
      <Searchbar onSubmit={onSubmitNewSearch} />
      <ImageGallery
        searchData={searchData}
        onHandleClickImage={onHandleClickImage}
      />
      {searchData.length !== 0 && <Button onLoadMore={onLoadMore} />}
      {isLoading && <Loader />}
      {isError && notFound()}
      {isModalOpen && (
        <Modal dataLargeImage={dataLargeImage} toogleModal={toogleModal} />
      )}
    </div>
  );
};

export default App;
