
export const ABOUT_QUERY = `
*[_type == "about"][0]{
  title,
  bio
}
`;

// WORKS OVERVIEW (tiles da landing)
export const WORKS_OVERVIEW_QUERY = `
*[_type == "worksOverview"][0]{
  tiles[]{
    key,
    title,
    enabled,
    image{
      alt,
      asset->
    }
  }
}
`;



/* =========================
   PROJECTS
========================= */

// BASE PROJECT FIELDS (reuse mental)
const PROJECT_FIELDS = `
  _id,
  title,
  slug,
  category,
  year,
  client,
  description,
  images[]{
    alt,
    asset->
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

// PROJECT DETAIL (opcional, se tiveres página individual)
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
        alt,
        asset->{
          _id,
          url,
          metadata{dimensions{width,height,aspectRatio}}
        }
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
      "cover": images[0]{
        alt,
        asset->{
          _id,
          url,
          metadata{dimensions{width,height,aspectRatio}}
        }
      }
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
        alt,
        asset->{
          _id,
          url,
          metadata{dimensions{width,height,aspectRatio}}
        }
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
      "cover": images[0]{
        alt,
        asset->{
          _id,
          url,
          metadata{dimensions{width,height,aspectRatio}}
        }
      }
    }
}
`;