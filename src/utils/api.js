const tokenHeaders = new Headers();
tokenHeaders.append('Authorization', 'token <ADD_YOUR_GITHUB_TOKEN>');

const api = {
  getBio(username) {
    username = username.toLowerCase().trim()
    const url = `https://api.github.com/users/${username}`
    return fetch(url, {headers: tokenHeaders}).then((res) => res.json());
  },
  getRepos(username) {
    username = username.toLowerCase().trim()
    const url = `https://api.github.com/users/${username}/repos`
    return fetch(url, {headers: tokenHeaders}).then((res) => res.json());
  },
  getNotes(username) {
    username = username.toLowerCase().trim()
    const url = `https://formationbam.firebaseio.com/${username}.json`
    return fetch(url).then((res) => res.json())
  },
  addNote(username, note) {
    username = username.toLowerCase().trim()
    const url = `https://formationbam.firebaseio.com/${username}.json`
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(note)
    }).then((res) => res.json())
  }
};

module.exports = api
