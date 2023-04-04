interface Data {
  data: {
    item: {
      season: string; 
      color: string;
      clothing_type: string;
      size: string;
      notes: string;
    }
  } 
}

export const getAllItems = async () => {
  const url = "https://closet-manager-be.herokuapp.com/api/v1/users/1/items";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable To Fetch Your Data. Try Later.");
  }
  return response.json();
};

export const filterItems = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable To Fetch Your Data. Try Later.")
  }
  return response.json()
};

export const createItem = async (data: FormData) => {
  const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/items`;
  const response = await fetch(url, {
    method: "POST",
    body: data,
  });
  if (!response.ok) {
    console.log(response)
    throw new Error("Unable To Fetch Your Data. Try Later.");
  }
  return response.json();
};

export const editItem = async ({data}: Data , id: number) => {
  const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/items/${id}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json"
  },
    body:  JSON.stringify(data),
  });
  if (!response.ok) {
    console.log(response)
    throw new Error("Unable To Update Item. Try Later.");
  }
  return response;
};

export const getSingleItem = async (id: string) => {
   const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/items/${id}`;
  // hard-coding this fetch for user 1 for now, make dynamic if we add other users
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable To Fetch Your Data. Try Later.");
  }
  return response.json();
}

export const deleteItem = async (id: string | number) => {
  const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/items/${id}`
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  }
  const res = await fetch(url, config)
  if (!res.ok) {
    throw new Error("Could not delete.")
  }
  return res.json();
}