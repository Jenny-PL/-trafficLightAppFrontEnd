
import "./SongListComponent.css";
import { Grid } from 'gridjs-react';

// Tutorial: https://gridjs.io/docs/integrations/react

interface SongListComponentProps {
    songList: any; //This songList should come from axios to GET all files.
    // then could use files['name'] to construcut a list of names only??
}
    // onClick of 'submit' within the sonFormPopUp component should send an axios request to 
    // get a file from database, or if already have the file, setChosenSong() to match selected File
    // from grid component


const SongListComponent = ({songList}: SongListComponentProps) =>{
// BUG: Uncaught TypeError: songList is not iterable
// songList:  {songList: Array(4)}  
// currently songList is returning just the NAMES (string) of the audiofiles
// ["PAW Patrol.mp3", "The Lion King - I Just Cant Wait to be King.mp3", "Un bolero de soledad.mp3", "Keep On The Sunny Side.mp3"]

    let songListData: any = [];
    let song: any;
    for (song of songList) {
        songListData.push([song]);
    }

    return (
    <div>
        <Grid
        data={songListData}
        // columns={['Songs Available']}
        // the second column is in case we are using JSON to extract the names:
        columns={[{id: 'name', name: 'Songs Available'}]}
        search={true}
        pagination={{
            enabled: true,
            limit: 8,}}
        /> 
  </div>)
}
export default SongListComponent;


