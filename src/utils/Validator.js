export const titleValidate = (title) => {
  if (title.length > 0 && title.length < 100) {
    return true;
  }

  return false;
};

export const descriptionValidate = (description) => {
  if (description.length > 0 && description.length < 1000) {
    return true;
  }

  return false;
};
