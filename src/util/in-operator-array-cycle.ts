const inOperatorArrayCycle = (props: Array<string>, obj: any): boolean => {
  for (const item of props) {
    if (!(item in obj))
      return false;
  }

  return true;
};

export default inOperatorArrayCycle;
