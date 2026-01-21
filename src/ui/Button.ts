import { Container, Graphics, Text } from "pixi.js";

export interface ButtonOptions {
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
  private bg: Graphics;
  private labelText: Text;

  private enabled = true;
  private onClickHandler: (() => void) | null = null;

  constructor(options: ButtonOptions) {
    super();

    const width = options.width ?? 150;
    const height = options.height ?? 50;
    const bgColor = options.bgColor ?? 0x5a6fd8;
    const textColor = options.textColor ?? 0xffffff;
    const fontSize = options.fontSize ?? 24;
    const borderRadius = options.borderRadius ?? 12;

    // Create button background with border
    this.bg = new Graphics()
      .roundRect(0, 0, width, height, borderRadius)
      .fill(0x2a3a6b)
      .roundRect(2, 2, width - 4, height - 4, borderRadius - 2)
      .fill(bgColor);

    this.labelText = new Text({
      text: options.text,
      style: {
        fontSize,
        fill: textColor,
        fontWeight: "600",
      },
    });
    this.labelText.anchor.set(0.5);
    this.labelText.position.set(width / 2, height / 2);

    this.addChild(this.bg);
    this.addChild(this.labelText);

    this.onClickHandler = options.onClick;

    this.eventMode = "static";
    this.cursor = "pointer";

    this.on("pointerdown", this.handlePointerDown);
    this.on("pointerenter", this.handlePointerEnter);
    this.on("pointerleave", this.handlePointerLeave);
  }

  private handlePointerDown = (): void => {
    if (!this.enabled) return;
    this.alpha = 0.8;
    this.onClickHandler?.();
  };

  private handlePointerEnter = (): void => {
    if (!this.enabled) return;
    this.alpha = 0.9;
  };

  private handlePointerLeave = (): void => {
    if (!this.enabled) return;
    this.alpha = 1;
  };

  public disable(): void {
    this.enabled = false;
    this.eventMode = "none";
    this.cursor = "default";
    this.alpha = 0.5;
  }

  public enable(): void {
    this.enabled = true;
    this.eventMode = "static";
    this.cursor = "pointer";
    this.alpha = 1;
  }

  public setText(text: string): void {
    this.labelText.text = text;
  }
}
