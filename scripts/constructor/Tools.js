class Tools {
  static emptyIfUndefined(element) {
    if (element === undefined) {
      return "";
    } else {
      return element;
    }
  }
}

export default Tools;
