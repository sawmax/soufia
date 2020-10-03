class CustomErr {
  private message: string;
  private status: number;

  constructor(message, status) {
    this.message = message;
    this.status = status;
  }

  public setget = (type: string, propsNum: number, val: any) => {
    switch (type) {
      case "setter":
        if (propsNum === 1) this.message = val;
        if (propsNum === 2) this.status = val;
        break;

      case "getter":
        if (propsNum === 1) return this.message;
        if (propsNum === 2) return this.status;
        break;

      default:
        break;
    }
  };

  public throwingErr = () => {
    const err = new Error(this.message);
    err["status"] = this.status;
    throw err;
  };
}

export = { CustomErr };
