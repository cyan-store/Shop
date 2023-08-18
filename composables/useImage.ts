export const useImage = (images: string) => {
    const first = images.split(",")[0];
    const assets = import.meta.env.VITE_ASSETS;

    return first
        ? `${assets}/products/${first}`
        : `${assets}/assets/placeholders/products.jpg`;
};

export const useImages = (images: string) => {
    const assets = import.meta.env.VITE_ASSETS;
    const imgs = images.split(",");

    return !images
        ? [`${assets}/assets/placeholders/products.jpg`]
        : imgs.map((i) => `${assets}/products/${i}`);
};
