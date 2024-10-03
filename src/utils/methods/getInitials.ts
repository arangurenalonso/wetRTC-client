const getInitials = (name: string) => {
  const words = name.trim().split(' ');

  // Si hay más de una palabra, toma la primera letra de cada una de las dos primeras palabras
  if (words.length >= 2) {
    return `${words[0][0].toUpperCase()}${words[1][0].toUpperCase()}`;
  }

  // Si hay una palabra, toma las dos primeras letras, o una si solo tiene una letra
  return words[0].substring(0, 2).toUpperCase();
};

export default getInitials;
