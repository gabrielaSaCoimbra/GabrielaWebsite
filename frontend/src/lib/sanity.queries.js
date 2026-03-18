export const ABOUT_QUERY = `
*[_type == "about"][0]{
  title,
  bio
}
`;

/* =========================
   IMAGE FRAGMENTS
========================= */

const IMAGE_ASSET_FIELDS = `
  _id,
  url,
  metadata{
    dimensions{
      width,
      height,
      aspectRatio
    }
  }
`;

const IMAGE_FIELDS = `
  alt,
  asset->{
    ${IMAGE_ASSET_FIELDS}
  }
`;

const COVER_IMAGE_FIELDS = `
  "cover": images[0]{
    ${IMAGE_FIELDS}
  }
`;

/* =========================
   HOME
========================= */

// WORKS OVERVIEW (tiles da landing)
export const WORKS_OVERVIEW_QUERY = `
*[_type == "worksOverview"][0]{
  tiles[]{
    key,
    title,
    enabled,
    image{
      ${IMAGE_FIELDS}
    }
  }
}
`;

/* =========================
   PROJECTS
========================= */

// BASE PROJECT FIELDS
const PROJECT_FIELDS = `
  _id,
  title,
  slug,
  category,
  year,
  client,
  description,
  images[]{
    ${IMAGE_FIELDS}
  }
`;

// ARCHITECTURE
export const ARCHITECTURE_PROJECTS_QUERY = `
*[_type == "project" && category == "architecture"]
| order(coalesce(year, 0) desc, _createdAt desc){
  ${PROJECT_FIELDS}
}
`;

// PRODUCT
export const PRODUCT_PROJECTS_QUERY = `
*[_type == "project" && category == "product"]
| order(coalesce(year, 0) desc, _createdAt desc){
  ${PROJECT_FIELDS}
}
`;

// EXHIBITION
export const EXHIBITION_PROJECTS_QUERY = `
*[_type == "project" && category == "exhibition"]
| order(coalesce(year, 0) desc, _createdAt desc){
  ${PROJECT_FIELDS}
}
`;

// PROJECT DETAIL
export const PROJECT_BY_SLUG_QUERY = `
*[_type == "project" && slug.current == $slug][0]{
  ${PROJECT_FIELDS}
}
`;

export const WORKS_INDEX_QUERY = `
{
  "ambient": *[_type == "ambientItem" && featured == true]
    | order(coalesce(year,0) desc, _createdAt desc){
      _id,
      title,
      year,
      featured,
      "category": "ambient",
      "tag": "Ambient",
      image{
        ${IMAGE_FIELDS}
      }
    },

  "projects": *[_type == "project" && featured == true]
    | order(coalesce(year,0) desc, _createdAt desc){
      _id,
      title,
      slug,
      category,
      year,
      client,
      featured,
      "tag": select(
        category == "architecture" => "Architecture",
        category == "product" => "Product",
        category == "exhibition" => "Exhibitions",
        "Project"
      ),
      ${COVER_IMAGE_FIELDS}
    }
}
`;

export const ARCHIVE_INDEX_QUERY = `
{
  "ambient": *[_type == "ambientItem"]
    | order(coalesce(year,0) desc, _createdAt desc){
      _id,
      title,
      year,
      featured,
      "category": "ambient",
      "tag": "Ambient",
      image{
        ${IMAGE_FIELDS}
      }
    },

  "projects": *[_type == "project"]
    | order(coalesce(year,0) desc, _createdAt desc){
      _id,
      title,
      slug,
      category,
      year,
      client,
      featured,
      "tag": select(
        category == "architecture" => "Architecture",
        category == "product" => "Product",
        category == "exhibition" => "Exhibitions",
        "Project"
      ),
      ${COVER_IMAGE_FIELDS}
    }
}
`;

export const MORE_WORK_SAME_CATEGORY_QUERY = `
*[_type == "project"
  && featured == true
  && category == $category
  && slug.current != $slug
]
| order(coalesce(year,0) desc, _createdAt desc)[0...4]{
  _id,
  title,
  slug,
  category,
  year,
  ${COVER_IMAGE_FIELDS}
}
`;
