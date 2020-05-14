let user = {"globalName" : "Анастасия"};

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
                    if (typeof element.hashTags !== "undefined") {
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
        if (!PostList.validate(this._posts[index])) return false;
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
        return true;
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
        valid.forEach((post) => this._posts.push(post));
        return invalid;
    }

    clear() {
        this._posts = [];
    }
     
}


class View {


    setName(){
        let container1 = document.getElementById('username');
        let template1 = document.getElementById('userTemplate');
        let newNote = document.importNode(template1.content, true);
        let placeholders = newNote.querySelectorAll('[data-target]');

        [].forEach.call(placeholders || [], (phElement) => {
            let key = phElement.getAttribute('data-target');
                phElement.textContent = String(user[key]);
        });
        container1.appendChild(newNote);

    }

    template = document.getElementById('template');
    container = document.getElementById('notes');

    fillItemData(newNote, data) {
        let placeholders = newNote.querySelectorAll('[data-target]');

        [].forEach.call(placeholders || [], (phElement) => {
            let key = phElement.getAttribute('data-target');
            if (key == 'author' && String(data[key]) == user.globalName) {
                phElement.textContent = String(data[key]);
                newNote.firstElementChild.querySelector('[class="edit"]').style.visibility="visible";
            }
            else
            if(key == 'hashTags'){
                phElement.textContent=String(data.hashTags.map(item => ' #' + item).join(''));
            }
            else
            if (key == 'createdAt') {
                phElement.textContent = String(data[key].toLocaleString());
            }
            else
                phElement.textContent = String(data[key]);
        });
        newNote.firstElementChild.setAttribute('id', data.id);
    }

    addItem(post) {
        let newNote = document.importNode(this.template.content, true);
        this.fillItemData(newNote, post);
        this.container.insertBefore(newNote, this.container.firstElementChild);
    }

    addAll(posts) {
        posts.forEach((post) => this.addItem(post));
    }

    edit(id, post) {
        let newNote = document.importNode(this.template.content, true);
        this.fillItemData(newNote, post);
        document.getElementById(id).replaceWith(newNote);
    }

    remove(id) {
        document.getElementById(id).remove();
    }
}


function addPost(post) {
    if (tweets.add(post))
        view.addItem(post);
}
function addAllPosts(posts) {
    if (tweets.addAll(posts))
        view.addAll(posts);
}
function removePost(id) {
    if (tweets.remove(id))
        view.remove(id);
}
function editPost(id, post) {
    if (tweets.edit(id, post))
        view.edit(id, tweets.get(id));
}

window.onload = () => {
    tweets = new PostList();
    view = new View();

    addAllPosts(posts1);
    addPost(valid);
    editPost("21", { description: "new text"})
    editPost("21", { hashTags: ["new tag", "tag"] });
    removePost("2");
    view.setName();
}


let posts1 = [
    {
        id: "1",
        description: "Смысла нет. Ни в чём. Пейте чай.",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
        hashTags: [],
        likes: ["Ева","Ася"]
    },
    {
        id: "2",
        description: "text2",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Анастасия",
        photoLink: "",
        hashTags: ["hashtag", "tag"],
        likes: []

    },
    {
        id: "3",
        description: "text3",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Анастасия",
        photoLink: "",
        hashTags: [],
        likes: []
    },
    {
        id: "4",
        description: "text4",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Петров Петр",
        photoLink: "",
        hashTags: [],
        likes: []
    },

    {
        id: "5",
        description: "text5",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hashTags: [],
        likes: []
    },
    {
        id: "6",
        description: "text6",
        createdAt: new Date('2020-03-25T23:00:00'),
        author: "Анастасия",
        photoLink: "",
        hashTags: [],
        likes: []
    },
    {
        id: "20",
        description: "text20",
        createdAt: new Date('2020-03-27T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hashTags: ["hashtag", "tag"],
        likes: []
    },
];
var valid = {
    id: "21",
    description: "text \n valid post",
    createdAt: new Date(),
    author: "Иван",
    hashTags: [],
    likes: []
};





