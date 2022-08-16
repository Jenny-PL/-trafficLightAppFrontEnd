
import "./SongListComponent.css";
import { Grid } from 'gridjs-react';
import { RowSelection } from "gridjs/plugins/selection";
import React, { useState, useEffect } from "react";
import "gridjs/dist/theme/mermaid.css";
import axios from 'axios';



// Tutorial: https://gridjs.io/docs/integrations/react
const url = "https://traffic-light-clock-be.herokuapp.com"
interface SongListComponentProps {
    setfileURL: Function;
    setChosenSong: Function;
    songList: any; //This songList should come from axios to GET all files.
    // then could use files['name'] to construcut a list of names only??
}
    // onClick of 'submit' within the sonFormPopUp component should send an axios request to 
    // get a file from database, or if already have the file, setChosenSong() to match selected File
    // from grid component


const SongListComponent = ({songList, setChosenSong, setfileURL}: SongListComponentProps) =>{
// returned from axios Get request, an object: `songList:  {songList: Array(4)} ` 
// currently songList['songList'] contains just the names (string) of the audiofiles
// ["PAW Patrol.mp3", "The Lion King - I Just Cant Wait to be King.mp3", "Un bolero de soledad.mp3", "Keep On The Sunny Side.mp3"]

    let uploadedSongs = songList['songList'];
    let songListData: any = [];
    let song: any;
    for (song of uploadedSongs) {
        songListData.push([song]);}


// This is an alternate way to populate the list:
    let songListUl = []
    for (song of uploadedSongs) {
    songListUl.push(<li onClick={(event) => handleListSelection(event)}>{song}</li>)}

// trying to write a function to 
const handleListSelection = (event:React.MouseEvent<HTMLElement>) => {
    let song = event.currentTarget;     // <li></li>
    console.log(song.innerText);        // 'song title.mp3'
    song.classList.add('active');
    let songName = song.innerText;
    // setChosenSong(songName); //BUG: This only sets the name, not the audioFile
    //axios call to return audioFile with use of songName

    axios.get(`${url}/alarmsong/${songName}`)
    .then((response) => {
          const responseSong = response.data;
          console.log('audioFile obtained from DB', response.status);
          console.log(response.data);
          setChosenSong(responseSong);
          let dbURL = `${url}/alarmsong/${songName}`;
          setfileURL(dbURL);
          
        }) 
        .catch((error) => {
          console.log('Error with getting songs from DB', error.response.status);
          console.log('The data from response with an error:', error.response.data);
        });
}


const handleSongSelection = (cell:any) => {
    setChosenSong(cell);
    cell.addClass('active');
        }


    return (
        <div>
        <span >
           {songListUl}
        </span>

        {/* BUG: how or use the RowSelection component */}
        {/* BUG: How to make only most recent selected row background color be dark */}
        <Grid
        data={songListData}
        // Note: this is one column, with an ID and name...in case we are using JSON to extract the names:
        columns={[{id: 'name', name: 'Songs Available', attributes: (cell) => {
            // add these attributes to the td elements only
            if (cell) {
            return {
            'data-cell-content':cell,
            'onclick': () => handleSongSelection(cell),

            // 'onclick': () => setChosenSong(cell),
            // onclick': () => alert(cell)
            };
            }} 
        }]}
        // columns={[
        //     {id:'Select Row',
        //     name: 'Select', 
        //     plugin:{
        //         component: RowSelection, 
        //         // rowSelection: 'single',
        //         props: {id: (row:any) => row.cell(1).data}
        //     }}, {id: 'name', name: 'Songs Available'}]}
        search={{enabled: true}}
        pagination={{
            enabled: true,
            limit: 5,}}
        language={{'search': {'placeholder': 'search songs...'}}}
        // className={{thead:'table-head', container:'whole-thing'}}
        />
        </div>
  )
}
export default SongListComponent;


