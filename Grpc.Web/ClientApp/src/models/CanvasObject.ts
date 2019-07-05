export default abstract class CanvasObject {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public width: number = 0,
    public height: number = 0,
    public isReady: boolean = false,
    public background: HTMLImageElement | null = null) { }
}