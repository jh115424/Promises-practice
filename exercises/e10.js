export const getFirstResolvedPromise = (promises) => {
  //*  write code to pass test ⬇️

  const mappedPromises = promises.map((promise) => {
    return Promise.resolve(promise).catch(() => {
      return Promise.reject(promise);
    });
  });
  return Promise.race(mappedPromises);
};

// #PASSED
export const getFirstPromiseOrFail = (promises) => {
  if (promises.length === 0) {
    return Promise.reject(new Error("No Promises were passed"));
  } else if (promises.length === 1) {
    return Promise.resolve(promises[0]);
  } else {
    return Promise.race(promises);
  }
};

// #PASSED
export const getQuantityOfRejectedPromises = (promises) => {
  //*  write code to pass test ⬇ ️
  if (promises.length === 0) {
    return 0;
  } else if (promises.length === 1) {
    return Promise.resolve(promises).catch(() => {
      return 1;
    });
  } else {
    return Promise.allSettled(promises).then((results) => {
      return results.filter((result) => {
        return result.status === "rejected";
      }).length;
    });
  }
};

// #Done
export const getQuantityOfFulfilledPromises = (promises) => {
  //*  write code to pass test ⬇ ️
  if (promises instanceof Array) {
    return Promise.allSettled(promises).then((results) => {
      return results.filter((result) => {
        return result.status === "fulfilled";
      }).length;
    });
  } else {
    return 0;
  }
};

//!  ⬇ ⬇ ⬇ ⬇ Don't Edit This Array ⬇ ⬇ ⬇ ⬇
export const allCharacters = [
  { id: 1, name: "billy" },
  { id: 2, name: "mandy" },
  { id: 3, name: "grim" },
];
//! ⬆  ⬆  ⬆  ⬆ do not edit this array   ⬆  ⬆  ⬆  ⬆ ️

//!  ⬇ ⬇ ⬇ ⬇ Don't Edit This Function ⬇ ⬇ ⬇ ⬇
export const fetchCharacterById = (id) => {

  // This function simulates an API, although most api's will return
  // simple data like this quickly, we want you to practice concurrent programming
  // so we're forcing each call to take one second
 
  const validIds = allCharacters.map((character) => character.id);
 

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!validIds.includes(id))
        reject(`we do not have a character with the id of ${id}`);

      return resolve(allCharacters.find((character) => character.id === id));
    }, 1000);
  });
};
// ⬆  ⬆  ⬆  ⬆ do not edit this function   ⬆  ⬆  ⬆  ⬆ ️

export const fetchAllCharactersByIds = async (ids) => {
  // To solve this you must fetch all characters passed in the array at the same time
  // use the `fetchCharacterById` function above to make this work
  //*  write code to pass test ⬇️
      
      //  const character = fetchCharacterById(ids);
      // const allIds = ids.map(character =>  {
    
      //   return fetchCharacterById(character);
      //  })
      //  setTimeout(() =>{
      //   console.log(allIds);
      //  }, 1000);
       
      const promise = new Promise((resolve, reject) =>{
       const array = ids.map(id => fetchCharacterById(id))
       try {
        resolve(array)
       }
       catch(error ) {
        reject(error)
       }
      });
 
      // console.log(promise);
      return promise;
      // return Promise.all(ids.map((id) => fetchCharacterById(id)));
    }
    //  console.log(allIds);

   
      



// const promises = ids.map((id) => fetchCharacterById(id));

// return Promise.all(promises);

//*  write code to pass test ⬇️
