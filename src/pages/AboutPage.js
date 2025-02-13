import React, {Component} from 'react';

export default class AboutPage extends Component {
    render() {
        return(
        <main className="about-page">

            <div id="heading" class="parallax1">
                <h1>Project: Music Viz</h1>
            </div>
            <div class="parallax1">


            <section>
                <ol>
                    <li class="h3">
                        <h3>Overview</h3>
                        <p class="h6">For our general topic, we want to do something related to music and how people
                            learn about music. We are both musicians and like to listen to a lot of music,
                            so we thought that this topic would be interesting and allow us to be somewhat
                            creative with our project. It is important that people continue making music
                            and artists can share their songs. There are plenty of platforms for people to
                            share music, but there are less about learning and understanding how music
                            works and how it is structured. We think that this problem space will allow
                            people to obtain a better understanding and help make their listening and
                            learning experiences better.
                        </p>
                    </li>
                    <li class="h3">
                        <h3>Justification</h3>
                        <p class="h6">
                            Music is a big part of people’s life. It is a form of recreation and remedy to
                            many. Billions of music is being streamed everyday, and because of this, we
                            want to create some applications that will help enhance the overall experience
                            of listening to music. Furthermore, the music is not just about listening but
                            also learning and playing as a form of social gathering and personal hobbies.
                            Because of this, we want to better both aspects of music, learning and
                            listening, in our project.
                        </p>
                    </li>
                </ol>
            </section>
            </div>
            <div class="parallax2">
            <section>
                <h2>Potential Web Applications</h2>
                <ul>
                    <li>
                        <h3>Music Visualizer</h3>
                        <p>
                            Our first idea is an interactive music visualizer. Through this web app a user
                            could choose a song and see how a computer analyzes the different pitches and
                            waves. This is often how people make beats and mixes of songs, and
                            visualizations can help people understand the different parts of a track.
                            Users would be able to take away certain parts of a song like the bass or
                            the vocals and see how the song changes in both sound and visual pattern.
                            This would teach them how certain parts of a song are put together and
                            what role each part plays. Users would also be able to choose how the
                            visualization looks. This would include options like colors and shapes of
                            the graph.
                        </p>
                        <h4>Questions our app could answer</h4>
                        <ul>
                            <li>What visualization can go with my song?</li>
                            <li>How does the music change when I take away a certain part?</li>
                            <li>What is the loudest part of my song?</li>
                        </ul>
                        <a href="https://www.renderforest.com/music-visualisations">Render Forest</a>
                    </li>
                    <li>
                        <h3>Chord Search</h3>
                        <p>
                            Our second idea is a chord search. The goal of this web app is to educate and
                            enhance offers people who like to play instruments (especially guitar and piano)
                            to find and explore songs that they can play by looking at their skill level.
                            This web app will allow users to input/select the chords that they know
                            (preferably guitar/piano) and then the website will output the songs that is
                            playable with the chords that they are able to play. A lot of people, when
                            trying to learn music would like to play something to keep the motivation and
                            fun in learning. And most of the time they don’t know any songs that they can
                            play with the chords that they know so resorting to playing and rehearsing the
                            same old group of songs. With this, we can give them more options to choose
                            from and also encourage them to learn 1 or 2 more chords to unlock more songs
                            that they can play as a result. The web app will have display of chords shape
                            and keys for users to search. We can also add filtering based on capo -
                            tuning required to make it easier for users to find songs based on the tools
                            that they have available.
                        </p>
                        <h4>Questions our app could answer</h4>
                        <ul>
                            <li>What are the songs that I can play according to the skill level that I have?</li>
                            <li>What are the chords that I should learn to increase my playability?</li>
                            <li>How do I play 'this' chord? What is the tab/info of the chord?</li>
                        </ul>
                        <a href="https://www.ultimate-guitar.com/ ">Utlimate Guitar</a>
                    </li>
                    <li>
                        <h3>Playlist Ranking</h3>
                        <p>
                            The third idea is a web application that allows users to create and share
                            their playlists, with other people. Users can search up songs that they would
                            want in their playlist and create them freely. Then they can choose to send
                            it to friends or submit it in a group to be ranked. The ranked playlist will
                            be displayed on the website, depending on the group (private/public) the
                            users will see their own playlist rank and where it stands on the leaderboard.
                            Users would also be able to rank songs within playlists, and the order of the
                            playlist could be sorted with the top ranking songs on top.
                        </p>
                        <h4>Questions our app could answer</h4>
                        <ul>
                            <li>What is the most popular playlist?</li>
                            <li>Where can I find more playlist?</li>
                            <li>How can I create a playlist and share it with others?</li>
                            <li>How popular will my plalist be?</li>
                        </ul>
                    </li>
                    </ul>
                    </section>
                    </div>
    </main>

                    
        )
    }
}