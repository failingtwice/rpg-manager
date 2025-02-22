<script lang="ts">
	const { text, onClick }: { text: string; onClick: () => void } = $props();
</script>

<button onclick={onClick} type="button">{text}</button>

<style>
	button {
		background-color: #3b3b3b;
		color: #fff;
		padding: 10px 20px;
		border: none;
		outline: none;
		cursor: pointer;
	}

	button:hover {
		background-color: #1f1f1f;
	}

	button:active {
		background-color: #3b3b3b;
		transform: translate3d(2px, 2px, 0);
	}
</style>
