// utils/CustomUploadAdapter.js
class MyUploadAdapter {
	constructor(loader) {
		this.loader = loader;
	}

	async upload() {
		const data = new FormData();
		const file = await this.loader.file;
		data.append("upload", file);

		const response = await fetch(
			"http://localhost:3000/api/v1/uploads/image",
			{
				method: "POST",
				body: data,
			}
		);

		const result = await response.json();
		return {
			default: result.url, // URL to embed in editor
		};
	}

	abort() {
		// handle abort if needed
	}
}

export function customUploadAdapterPlugin(editor) {
	editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
		return new MyUploadAdapter(loader);
	};
}
