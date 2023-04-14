export default `
  :host {
    display: block;
    width: 100%;
    height: 300px;
    margin: 3rem 0;
    position: relative;
  }

  #wind-direction {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 250px;
    height: 250px;
    line-height: 250px;
    border-radius: 50%;
    text-align: center;
    font-size: 1.2rem;
    text-indent: 5rem;
    color: #fff9;
    box-shadow: 5px -10px 25px -1px #fff3, -5px 10px 35px -1px #0005, 5px -10px 15px -1px #fff3 inset, -5px 10px 15px -1px #0005 inset;
  }

  #wind-direction::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 10px;
    height: 10px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow: 2px -5px 5px -1px #fff1, -2px 2px 5px -1px #000, 1px 1px 1px 1px #fff1 inset;
  }

  #wind-direction::after {
    content: "";
    position: absolute;
    line-height: 0;
    font-size: 1.2rem;
    text-indent: 2rem;
    left: 50%;
    top: 50%;
    width: 40%;
    height: 2px;
    box-shadow: 5px -10px 15px -1px #fff, -5px 10px 15px -1px #000, 1px 1px 1px 1px #fff5 inset;
  }

  nav {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
    height: 250px;
  }

  nav small {
    display: block;
    position: absolute;
    line-height: 0;
    opacity: 0.2;
    font-size: 1rem;
    font-weight: 700;
    text-indent: -0.25em;
  }

  .n {
    left: 50%;
    top: 10%;
  }

  .ne {
    display: none;
  }

  .e {
    left: 90%;
    top: 50%;
  }

  .se {
    display: none;
  }

  .s {
    left: 50%;
    top: 90%;
  }

  .sw {
    display: none;
  }

  .w {
    left: 10%;
    top: 50%;
  }

  .nw {
    display: none;
  }

  .label {
    left: 52%;
    top: 70%;
    transform: translate(-50%, -50%);
  }

`
