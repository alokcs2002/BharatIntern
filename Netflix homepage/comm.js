$(function(){

    $('#save').click(function(){
        $('#display').html("Enter Website URL : <input type='text' class='form-control' id='url'><br>Enter Username : <input type='text' class='form-control' id='username'><br>Enter Password : <input type='password' class='form-control' id='password'><br");
        $('#submit').show();
    });

    $('#show').click(function(){
        chrome.storage.sync.get(['url','username','password'],function(result){
            $('#display').html("<tr><th>URL</th><th>Username</th><th>Password</th></tr>");
            for(var i=0;i<result.url.length;i++){
                $('#display').append("<tr>"+"<td>"+result.url[i]+"</td>"+"<td>"+result.username[i]+"</td>"+"<td>"+result.password[i]+"</td>"+"</tr>");
            }
        });
        $('#submit').hide();
    });

    $('#submit').click(function(){
        var url = $('#url').val();
        var username = $('#username').val();
        var password = $('#password').val();

        if(url != "" && username != "" && password != ""){
            chrome.storage.sync.get(['url','username','password'],function(result){
                if(result.url){
                    var rurl = result.url;
                    var rusername = result.username;
                    var rpassword = result.password;
                    rurl.push(url);
                    rusername.push(username);
                    rpassword.push(password);
                    chrome.storage.sync.set({'url':rurl,'username':rusername,'password':rpassword});
                }
                else{
                    chrome.storage.sync.set({'url':[url],'username':[username],'password':[password]});
                }       
            });
            $('#display').text('Successfully Updated')
        }
        else{
            $('#display').text('Please Enter Valid Information');  
        }
        $('#submit').hide();
    });

});