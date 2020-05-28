// GET API EndPoint
export const GET_CONTENT_DETAILS = `api/getContentDetails?_format=hal_json`;

// POST API EndPoint
export const POST_CONTENT_DETAILS = `api/postContentDetails?_format=hal_json`;

// Category List API
export const CATEGORY_LIST_API_URL = `${GET_CONTENT_DETAILS}&type=views&name=categories&api=categoryList`;

// Blog List API
export const BLOG_LIST_API_URL = `${GET_CONTENT_DETAILS}&type=views&name=rest_node_resource&api=blogListing`;

// Blog View API
export const BLOG_VIEW_API_URL = `${GET_CONTENT_DETAILS}&type=views&name=rest_node_resource&api=blogs&id=/blog/`;

// Social Media API
export const SOCIAL_MEDIA_API_URL = `${GET_CONTENT_DETAILS}&type=views&name=rest_node_resource&api=socialMedia&id=all`;

// URL Alias
export const ALIAS_API_URL = `${GET_CONTENT_DETAILS}&type=views&name=rest_node_resource&api=pageAlias`;
