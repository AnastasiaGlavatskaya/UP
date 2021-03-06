let posts = [

        {
            id: "1",
            description: "Более 76 тыс. человек во всем мире уже излечились от заболевания, " +
                "спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Иванов Иван",
            photoLink: "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
            hasnTags: [],
            likes: ["Ева","Ася"]
        },

        {
            id: "2",
            description: "text2",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hashTags: ["hashtag", "tag"],
            likes: []

        },
        {
            id: "3",
            description: "text3",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: [],
            likes: []
        },
        {
            id: "4",
            description: "text4",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Петров Петр",
            photoLink: "",
            hasnTags: [],
            likes: []
        },
    
        {
            id: "5",
            description: "text5",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: [],
            likes: []
        },
        {
            id: "6",
            description: "text6",
            createdAt: new Date('2020-03-25T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: [],
            likes: []
        },
        {
            id: "7",
            description: "text7",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Котик",
            photoLink: "https://avatars.mds.yandex.net/get-zen_doc/233051/pub_5cc021e170f6f500b0dde324_5cc026c055863600b3c2d5ce/scale_1200",
            hasnTags: [],
            likes: []
        },
        {
            id: "8",
            description: "text8",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: [],
            likes: []
        },
        {
            id: "9",
            description: "text9",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: [],
            likes: []
        },
        {
            id: "10",
            description: "text10",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: [],
            likes: ["Котик"]
        },
        {
            id: "11",
            description: "text11",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: [],
            likes: ["Котик"]
        },
        {
            id: "12",
            description: "text10",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: [],
            likes: ["Котик"]
        },
        {
            id: "13",
            description: "text10",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: [],
            likes: ["Котик"]
        },
        {
            id: "14",
            description: "text10",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: [],
            likes: ["Котик"]
        },
        {
            id: "15",
            description: "text10",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: [],
            likes: ["Котик"]
        },
        {
            id: "16",
            description: "text10",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: [],
            likes: ["Котик"]
        },
        {
            id: "17",
            description: "text10",
            createdAt: new Date('2020-03-17T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: [],
            likes: ["Котик"]
        },
        {
            id: "18",
            description: "text10",
            createdAt: new Date('2020-03-25T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: [],
            likes: []
        },
        {
            id: "19",
            description: "text10",
            createdAt: new Date('2020-03-26T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: ["tag"],
            likes: ["Котик"]
        },
        {
            id: "20",
            description: "text20",
            createdAt: new Date('2020-03-27T23:00:00'),
            author: "Иванов Иван",
            photoLink: "",
            hasnTags: ["hashtag", "tag"],
            likes: []
        },

];
class PostList {
    constructor(posts) {
        this._posts = posts || [];
    }

    static _sortByDate(posts) {
        return posts.sort((a, b) => a.createdAt.getTime() > b.createdAt.getTime() ? -1 : 1);
    }

    getPage(skip, top, filterConfig) {
        var result = this._posts;
        var from = skip || 0;
        var number = top || 10;
   
        if (filterConfig) {
            if (filterConfig.author) {
                result = result.filter(function (element) {
                    return element.author == filterConfig.author;
                })
            }
            if (filterConfig.dateFrom) {
                result = result.filter(function (element) {
                    return element.createdAt.getTime() >= filterConfig.dateFrom.getTime();
                })
            }
            if (filterConfig.dateTo) {
                result = result.filter(function (element) {
                    return element.createdAt.getTime() <= filterConfig.dateTo.getTime();
                })
            }

            if (filterConfig.hashTags && filterConfig.hashTags.length != 0) {
                result = result.filter(function (element) {
                    if (typeof element.hashtags !== "undefined") {
                        return filterConfig.hashTags.every(function (tag) {
                            return element.hashTags.indexOf(tag) >= 0;
                        })
                    }
                })
            }
        }
        result = PostList._sortByDate(result);
        return result.slice(from, from + number);
    }

    static _containsId(posts, id) {
        if (posts.filter(function (element) {
                return element.id == id;
        }).length != 0) {
            return true;
        }
        else {
            return false;
        }
    }

    get(id) {
        if (!PostList._containsId(this._posts, id)) {
            return false;
        }
        else {
            return this._posts.filter(function (element) {
                return element.id == id;
            })[0];
        }
    }

    static validate(post) {
        if (!post.id || !post.author || post.author.length == 0 || !post.description || post.description.length == 0 || post.description.length > 200 ||
            !post.createdAt || post.createdAt.length == 0) return false;
        if (!Date.parse(post.createdAt)) {
            return false;
        }
        else {
            return true;
        }
    }

    add(post) {
        if (!PostList.validate(post)) {
            return false;
        }
        if (PostList._containsId(this._posts, post.id)) {
            return false;
        }
        else {
            this._posts.push(post);
            return true;
        }
    }

    static _find(posts, id) {
        if (!PostList._containsId(posts, id)) {
            return false;
        }
        else {
            return posts.filter(function (element) {
                return element.id == id;
            })[0];
        }
    } 

    edit(editId, post) {
        if (!PostList._containsId(this._posts, editId)) return false;
        var index = this._posts.indexOf(PostList._find(this._posts, editId));
        if (!PostList.validate(this._posts[index])) return false;
        if (post.description && post.description.length !== 0) {
            this._posts[index].description = post.description;
        }
        if (post.hashTags) {
            this._posts[index].hashTags = post.hashTags;
        }
        if (post.photoLink) {
            this._posts[index].photoLink = post.photoLink;
        }
        return true;
    }

    remove(removeId) {
        var index = this._posts.indexOf(PostList._find(this._posts, removeId));
        if (index != -1) {
            this._posts.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    }

    addAll(postsAdd) {
        var invalid = [];
        var valid = [];
        postsAdd.forEach(function (post) {
            if (!PostList.validate(post)) {
                invalid.push(post);
            }
            else { 
                
                valid.push(post);
                return true;
            }
           
        });
        this._posts.push(valid);
        return invalid;
    }

    clear() {
        this._posts = [];
    }
     
}

var tweets = new PostList(posts);

console.log("id = 3 ");
console.log(tweets.get("3"));
console.log("id does not exist " + tweets.get("30"));

var valid = {
    id: 21,
    description: "text \n valid post",
    createdAt: new Date(),
    author: "Иван",
    hasnTags: [],
    likes: []
};

var invalid = {
    id: 21,
    description: "text",
    createdAt: "22 33 55",
    author: "Иван",
    hasnTags: [],
    likes: []
};

var invalid1 = {
    id: 55,
    author: "Nobody",
    description: "",
    createdAt: new Date(),
};

var invalid2 = {
    id: 44,
    author: "Nobody",
    description: "text",
};

console.log(PostList.validate(valid));
console.log(PostList.validate(invalid1));
console.log(PostList.validate(invalid2));

var post2 = {
    id: 2,
    description: "id = 2 -- invalid",
    createdAt: new Date(),
    author: "Иван",
    hasnTags: [],
    likes: []
};

console.log(tweets.add(valid));
console.log(tweets.add(post2));
console.log(tweets.add(invalid1));
console.log(tweets.get(21));

console.log("before edit ");
console.log(tweets.get(1));
tweets.edit("1", { photoLink: "https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg" });
console.log("after edit ");
console.log(tweets.get(1));
tweets.edit("101", { photoLink: "https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg" });

console.log("tweets.getPage(0, 10, author: Иванов Иван): ");
tweets.getPage(0, 10, { author: "Иванов Иван" }).forEach(function (element) {
    console.log(element);
});
tweets.remove("1");
console.log("tweets.getPage(0, 12, author: Иванов Иван): after tweets.remove(1)");
tweets.getPage(0, 10, { author: "Иванов Иван" }).forEach(function (element) {
    console.log(element);
});
console.log("tweets.getPage(0, 10, author: Иванов Иван, hashTag: hashtag): ");
tweets.getPage(0, 10, { author: "Иванов Иван", hashTag: "hashtag" }).forEach(function (element) {
    console.log(element);
});
console.log("tweets.getPage(10, 10, author: Иванов Иван, hashTag: hashtag и/или tag): ");
tweets.getPage(10, 10, { author: "Иванов Иван", hashTag: ["hashtag", "tag"] }).forEach(function (element) {
    console.log(element);
});
console.log("tweets.getPage(0, 10, dateFrom = ('2020-03-25T23:00:00'), dateTo: ('2020-03-26T23:00:00') ): ");
tweets.getPage(0, 10, { dateFrom: new Date('2020-03-25T23:00:00'), dateTo: new Date('2020-03-26T23:00:00') }).forEach(function (element) {
    console.log(element);
});

tweets.addAll([valid, invalid1, invalid2]);
