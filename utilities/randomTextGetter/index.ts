export const randomTextGetter = (texts) => {
        const randomIndex = (Math.floor(Math.random() * 100)) % texts.length;
        return texts[randomIndex];
}

export default randomTextGetter;