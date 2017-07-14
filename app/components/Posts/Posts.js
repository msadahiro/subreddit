import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    Image,
    Picker,
    Slider
} from 'react-native';

export default class Posts extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            category: 'food',
            limit: 5,
            postDataSource: ds
        }
        this.renderRow = this.renderRow.bind(this);
    }
    componentDidMount() {
        this.fetchPosts();
    }
    fetchPosts() {
        fetch(`https://www.reddit.com/r/${this.state.category}/top.json?limit=${this.state.limit}`)
            .then((response) => response.json())
            .then((response) => {
                let posts = response.data.children;
                this.setState({
                    postDataSource: this.state.postDataSource.cloneWithRows(posts)
                });
            });
    }

    renderRow(post) {
        let image;
        try {
            if (typeof post.data.preview.images[0].source.url == undefined) {
                image = <Text></Text>
            }
            else {
                image = <Image style={styles.thumbnail} source={{ uri: post.data.preview.images[0].source.url }} />
            }
        }
        catch (e) {
            console.log(e)
        }
        return (
            <TouchableHighlight>
                <View style={styles.row} >
                    {image}
                    <Text style={styles.text}>{post.data.title}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    changeCategory(value) {
        this.setState({ category: value }, () => {
            this.fetchPosts();
        })
    }

    changeLimit(value) {
        this.setState({ limit: value }, () => {
            this.fetchPosts();
        })
    }

    render() {
        return (
            <View>
                <Picker
                    selectedValue={this.state.category}
                    onValueChange={(value) => this.changeCategory(value)}
                >
                    <Picker.Item label="Food" value="food" />
                    <Picker.Item label="Coding" value="coding" />
                    <Picker.Item label="Sports" value="sports" />
                    <Picker.Item label="Movies" value="movies" />
                    <Picker.Item label="Hiking" value="hiking" />
                </Picker>
                <Slider
                    maximumValue={25}
                    minimumValue={5}
                    step={5}
                    value={this.state.limit}
                    onValueChange={(value) => this.changeLimit(value)}
                />
                <ListView
                    dataSource={this.state.postDataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 12,
        backgroundColor: '#f6f6f6',
        marginBottom: 3
    },
    text: {
        flex: 3
    },
    thumbnail: {
        height: 60,
        width: 60,
        flex: 1,
        margin: 4
    }
});

AppRegistry.registerComponent('Posts', () => Posts);
