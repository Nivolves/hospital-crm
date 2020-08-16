export const getTransformImages = (link: string) => {
  if (!link) return [];
  const linkArr = link.split('/');
  const image = linkArr[linkArr.length - 1];
  const imageName = image.substring(0, image.indexOf('.'));
  const imageExtantion = image.substring(image.indexOf('.'), image.length);

  return [
    link.replace(image, `${imageName}-transform${imageExtantion}`),
    link.replace(image, `${imageName}-binary${imageExtantion}`),
  ];
};
