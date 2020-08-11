export const searchByTags = (models, info, searchText) => {
    if (searchText === undefined || searchText === "") {
        return models;
    }

    const searchTextLower = searchText.toLowerCase();

    return models.filter(model => {
        const tags = info[model.name]["Tags"];
        for (const tag of tags) {
            const subtags = tag.split(" ");
            for (const subtag of subtags) {
                const subtagLower = subtag.toLowerCase();

                if (searchTextLower.includes(subtagLower) || subtagLower.includes(searchTextLower)) {
                    return true;
                }
            }
        }

        return false;
    })
}