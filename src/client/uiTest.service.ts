import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class TestUtil {
    public data: any;

    constructor() {
        this.setData(null);
    }

    public getObservable(obj: any) {
        return Observable.of(obj);
    }

    public setData(data) {
        this.data = data || {
            'reposCreateMultiple': [
                {
                    'repoId': '1',
                    'repo': 'repo1',
                    'ownerId': 'Owner1',
                    'owner': 'owner name'
                },
                {
                    'repoId': '2',
                    'repo': 'repo2',
                    'ownerId': 'Owner2',
                    'owner': 'owner name2'
                }
            ],
            'gistUrl': 'http://gist1',
            'githubRepos': [
                {
                    'id': '1',
                    'full_name': 'repo1',
                    'owner': {
                        'id': 'Owner1',
                        'login': 'owner name'
                    }
                },
                {
                    'id': '2',
                    'full_name': 'repo2',
                    'owner': {
                        'id': 'Owner2',
                        'login': 'owner name2'
                    }
                }
            ],
            mockGists: [
                {
                    files: {
                        key1: {
                            filename: 'keyvalue1'
                        }
                    },
                    html_url: 'http://gist1'
                },
                {
                    files: {
                        key2: {
                            filename: 'keyvalue2'
                        }
                    },
                    html_url: 'http://gist2'
                },
            ]
        };
    }

}
