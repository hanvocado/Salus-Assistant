function getImgUrl (name){
  return new URL(`../assets/dishes/${name}`, import.meta.url)
}
export {getImgUrl}