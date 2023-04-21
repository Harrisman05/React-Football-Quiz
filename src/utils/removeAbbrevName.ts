export default function removeAbbrevName(name: string) {
    const removedAbbrevName = name
    .split(' ')
    .filter((el) => {
      if (el.includes('.') && el.length === 2) return false;
      else return true;
    })
    .join(' ');
    return removedAbbrevName;
  };