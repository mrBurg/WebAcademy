export const setToLocalStorage = async (key: string, data: any) => {
//   const isExists = window.localStorage.getItem('token');

  window.localStorage.setItem(key, data);
};

export const getFromLocalStorage = async (key: string) => {
    // const isExists = window.localStorage.getItem('token');
  
    window.localStorage.getItem(key)
  };
