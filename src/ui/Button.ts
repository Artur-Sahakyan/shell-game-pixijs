import { Container, Graphics, Text } from "pixi.js";

interface ButtonOptions {
  text: string;
  width?: number;
  height?: number;
  bgColor?: number;
  textColor?: number;
  fontSize?: number;
  borderRadius?: number;
  onClick: () => void;
}

export class Button extends Container {
  constructor(options: ButtonOptions) {
    super();

    const width = options.width ?? 150;
    const height = options.height ?? 50;
    const bgColor = options.bgColor ?? 0x4a90e2;
    const textColor = options.textColor ?? 0xffffff;
    const fontSize = options.fontSize ?? 24;
    const borderRadius = options.borderRadius ?? 10;

    const bg = new Graphics()
      .roundRect(0, 0, width, height, borderRadius)
      .fill(bgColor);

    const text = new Text({
      text: options.text,
      style: {
        fontSize,
        fill: textColor,
      },
    });
    text.anchor.set(0.5);
    text.position.set(width / 2, height / 2);

    this.addChild(bg);
    this.addChild(text);
    this.eventMode = "static";
    this.cursor = "pointer";
    this.on("pointerdown", options.onClick);
  }
}

