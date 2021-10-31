<p align='center'>
<img src='https://github.com/dsryan8197/photoboardlanding/blob/master/logo.png' width=100%>
</p>

# storyboardAR
<h4>an Augmented Reality app to help filmmakers storyboard their films</h4>
<p align='left'> 
<img src='https://github.com/dsryan8197/photoboardlanding/blob/master/storyboard2copy.gif' width='100%' height='100%'/>
</p>
<p align='left'> 
<img src='https://github.com/dsryan8197/photoboardlanding/blob/master/storyboardfinal.gif' width='100%' height='100%'/>
</p>
## Contribute
<p>1. download the Viro Media App, swipe right and click on enter testbed</p>
<p>2. Fork and clone photoboARd from this repo</p>
<p>3. npm install</p>
<p>4. npm start</p>
<p>5. take the url from the cli and pass it into the testbed on Viro Media App to view your dev enviornment</p>
<p>6. at any point shake your phone to reload the application</p>
<p>7. Check out the Projects tab at the top of the page for open tickets. Please mark those you take on as 'in progress'</p>
<p>8. Submit a PR!</p>
<p>9. Create a github issue for any ideas or bugs</p>

## File Structure
```
Src folder
      ----App.js-----
     |              |
NameAProject       PickAScene
     |              |
NameAScene          |
     |------->   PickAPic

(PickAPic.js conditionally renders 4 components for
 -list of pics(images)
 -AR visualizer (also connected HlloWorldSceneAR.js)
 -Component of a dozen model selections
 -Component of a dozen stance selections)        


 MODLES/Images
 finalModles folder - all the gltfs of models
 picsofModels folder -all the images of models
 ModelScript.js - my api for the above folders
```
