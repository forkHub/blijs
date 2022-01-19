Graphics(640, 480);

let brush: IImage;

async function Start(): Promise<void> {
	brush = await LoadImage('./gbr/brush.png');
	MidHandle(brush);
}

async function Loop(): Promise<void> {
	if (InputDrag()) {
		DrawImage(brush, InputX(), InputY());
	}
}