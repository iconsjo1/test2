export const formatNewsHTML = html => {
    return formatImage(removeBetween(html, '[', ']'));
}

const removeBetween = (content, from, to) => {
    const fromSplit = content.split(from);
    const toSplit = fromSplit.map(el => el.split(to)[1]);
    return toSplit.join('');
}

const formatImage = html => {
    const imgTag = html.split('<img');
    if (imgTag.length > 1) {
        let inBetweenContent = imgTag[1].split('/>');
        inBetweenContent[0] = "<img src=\"" + extractSrc(inBetweenContent[0]) + "\" /></br>";
        imgTag[1] = inBetweenContent;
        return imgTag.join("");
    }
    else return html;
}

const extractSrc = (imgString) => {
    const srcArray = imgString.split('src');
    const imgSrc = srcArray[1].split("\"");
    return imgSrc[1]
}