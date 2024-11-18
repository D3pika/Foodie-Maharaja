import request, { gql } from "graphql-request";
const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const GetCategory = async () => {
  const query = gql`
    query MyQuery {
      categories {
        id
        slug
        name
        icon {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const GetBusiness = async (category) => {
  const query =
    gql`query GetBusiness {
  restaurants(where: {category_some: {slug: "` +
    category +
    `"}}) {
    aboutUs
    address
    banner {
      url
    }
    category(where: {}) {
      name
    }
    id
    name
    restroType
    slug
    workingHours
  }
}`;
  const result = await request(MASTER_URL, query);
  return result;
};

const GetBusinessDetail = async (businessSlug) => {
  const query =
    gql`query RestaurantDetail {
  restaurant(where: {slug: "` +
    businessSlug +
    `"}) {
    aboutUs
    address
    banner {
      url
    }
    category {
      name
    }
    id
    menu {
      ... on Menu {
        id
        category
        menuitem {
          ... on MenuItem {
            id
            name
            price
            productImage {
              url
            }
          }
        }
      }
    }
    name
    restroType
    slug
    workingHours
  }
}`;
  const result = await request(MASTER_URL, query);
  return result;
};

const AddToCart = async (data) => {
  const query =
    gql`mutation AddToCart {
  createUserCart(
    data: {email:"` +
    data?.email +
    `", price:` +
    data?.price +
    `, productImage:"` +
    data?.productImage +
    `", productName:"` +
    data.name +
    `",
    restaurant:{connect:{slug:"` +
    data?.restaurantSlug +
    `"}}}
  ){
    id
  }
  publishManyUserCarts(to: PUBLISHED){
    count
  }
}`;
  const result = await request(MASTER_URL, query);
  return result;
};

const GetUserCart = async (userEmail) => {
  const query =
    gql`query GetUserCart {
  userCarts(where: {email: "` +
    userEmail +
    `"}) {
    id
    email
    price
    productName
    productImage
    restaurant {
      name
      banner {
        url
      }
      slug
    }
  }
}`;
  const result = await request(MASTER_URL, query);
  return result;
};

const DisconnectRestroFromUserCartItem = async (id) => {
  const query =
    gql`mutation DisconnectRestaurantFromCartItem {
      updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "` +
    id +
    `"}) {
        id
      }
      publishManyUserCarts(to: PUBLISHED) {
        count
        }
      }`;
  const result = await request(MASTER_URL, query);
  return result;
};

const DeleteItemFromCart = async (id) => {
  const query = gql`
    mutation DeleteCartItem($id: ID!) {
      deleteManyUserCarts(where: { id: $id }) {
        count
      }
    }
  `;

  try {
    const variables = { id };
    const result = await request(MASTER_URL, query, variables);
    return result;
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    throw error;
  }
};

const AddNewReview = async (data) => {
  const query = gql`
    mutation AddNewReview {
      createReview(
        data: {
          email: "`+data.email+`",
          profileImage: "`+data.profileImage+`",
          reviewText: "`+data.reviewText+`",
          star: `+data.star+`,
          userName: "`+data.userName+`",
          restaurant: { connect: { slug: "`+data.RestroSlug+`" } }
        }
      ) {
        id
      }
      publishManyReviews(to: PUBLISHED) {
        count
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const GetReviews = async (slug) => {
  const query = gql`
    query GetReviews {
      reviews(where: {restaurant: {slug: "` + slug + `"}}, orderBy: publishedAt_DESC) {
        email
        profileImage
        publishedAt
        reviewText
        star
        userName
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const CreateNewOrder=async(data)=>{
  const query=gql`
  mutation CreateNewOrder {
    createOrder(
      data: {
        email: "`+data.email+`",
        orderAmount: `+data.orderAmount+`,
        restaurantName: "`+data.restaurantName+`",
        userName: "`+data.userName+`",
        address: "`+data.address+`",
        zipCode: "`+data.zipCode+`",
        phone: "`+data.phone+`",
      }
    ){
      id  
    }
  }
  `
  const result=await request(MASTER_URL,query);
  return result;
}


const UpdateOrderToAddOrderItems=async(name,price,id,email)=>{
  const query=gql`
  mutation UpdateOrderWithDetails {
    updateOrder(
      data: {
        orderDetails: {
          create: {
              OrderItem: {
                data: {
                  name: "`+name+`",
                  price: `+price+`,
                }
              }
            }
          }
        } 
      where: {id: "`+id+`"}) {
      id
    }
      publishManyOrders(to: PUBLISHED) {
        count
      }

      deleteManyUserCarts(where: { email: "`+email+`" }) {
        count
      }

  }
  `
  const result=await request(MASTER_URL,query);
  return result;
}

export default {
  AddToCart,
  GetCategory,
  GetBusiness,
  GetBusinessDetail,
  GetUserCart,
  DisconnectRestroFromUserCartItem,
  DeleteItemFromCart,
  AddNewReview,
  GetReviews,
  CreateNewOrder,
  UpdateOrderToAddOrderItems,
};
