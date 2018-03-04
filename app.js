/*
C = coins array
cy = coin loop y pos

S = addColorStop
e = pusher size
E = edge start
f=pusher min size
f = pusher position
g = 'fillStyle'
G=edge gradient
h = 'fillRect'
i = loop iteration
j = coin size = 20;
J = j*2
k = key used in loops
l = key used in coin loops
u() = update loop
M = Math
m = velocity multiplier
p = pusher object
q = pusher pos + pusher min
r() = function to return random int (pass in max)
t=player coin count

v,w

z = coin loop iterator

*/
S='addColorStop';
e=200;
f=41;
E=400;
g='fillStyle';
h='fillRect';
i=0;
j=20;
J=j*2;
p={y:0,v:0};
t=10;
m=1.6;
M=Math;

//Generate coins
C=[];

//Coin positions
for(z=0;z<20;z++){
    for(v=0;v<5;v++){
        C.push({
            x:j+(z*(J)),
            y:200 + (v* (J)  ),
            v:0
        });
    }

    
}

//Add some coins to the pusher
for(z=0;z<26;z++){
    C.push({
        x:5+j+(z*(j*1.5)),
        y:(f-j) -(M.random() * j) -2,
        v:0
    });
}

u=()=>{

    //Clear / Draw Background
    c[g]='#aaa';
    c[h](0,0,800,400);
    
    

    //Draw edge
    G=c.createLinearGradient(0,E,0,600);
    G[S](0,"#888");
    G[S](.1,"#999");
    G[S](1,"#111");
    c[g] = G;
    c[h](0,E,800,600);

    //Calc pusher veloc / pos
    p.v = M.sin(i);
    p.y = p.y + (p.v*m);

    //Pusher pos + pusher min
    q=p.y+f;

    //Draw the pusher
    c[g]='#333';
    c[h](0,0,800,q);       
    

    
    for(k in C){  

        K = C[k];

        //Coins are on pusher - move with it
        if(K.y + j < q) K.y += p.v*m; 
        
        //Push the coins if more than half off the pusher
        else if(q > K.y && p.v > 0) {
            K.v = p.v;
            K.y += p.v*m;
        }


        //Check touching edge of screen
        if(K.y < 1) K.y = 1;

        //Remove coins that have fallen out of the screen and Increase coin count 
        if(K.y > 600){
            t++;
            C.splice(k,1);
        }
    
    }

    for(k=0;k<C.length;k++){

        K = C[k];

        //Ignore if fallen off edge - increase veloc
        if(K.y + j > E){
            K.y += 12;
            continue;
        } 

        for(l=0;l<C.length;l++){

            L = C[l];

            if( k!=l &&
                //Check coins overlapping
                ((K.x+j) - (L.x+j) ) * ((K.x+j) - (L.x+j)) + ((K.y+j) - (L.y+j)) * ((K.y+j) - (L.y+j)) < 
                J * J

            ){  
                
                //Absorb velocity from other coin (no velocity whilst on pusher)

                //Only move if less than a quarter overlapping
                if(M.abs(K.y - L.y) > j*1.5) {
                    
                    //Make sure velocity is always absorbed from the coin above
                    if(K.y < L.y){
                        //Velocity gets less further down the screen - last number is percentage to reduce power by
                        L.v = K.v - ((K.v / 100) * (((L.y - e) / (E-e) ) * 67));
                        L.y += L.v*m;
                    } 
                    
                    else {
                        K.y += K.v*m ;
                    }

                    //Both Coins on pusher, reverse the velocity the coin has absorbed from the pusher so it stays still
                    if(K.y < q && L.y < q && K.y < L.y) L.y += M.abs(p.v*m);
                    
                }

            }

        }
        
    }
        
    for(k in C){

        K = C[k];

        c[g] = '#edcb09';
        c.save();

        c.shadowColor = 'rgba(0,0,0,.3)';
        c.shadowOffsetY = 1;

        if(K.y < q){
            c.shadowOffsetY = 4;
        } 

        c.beginPath();
        c.arc(K.x, K.y+j, j, 0, 2*M.PI);
        c.fill();

        c.restore();
    }
      
    
    i+=.02;

    c.font = '20px arial';
    c.fillText(t, 10, 30);

    requestAnimationFrame(u);
};

u();

d.addEventListener('click', W=>{
    if(t>0 && W.offsetY < e){
        t--;
        C.unshift({x: W.offsetX, y:W.offsetY-j, v:0});
    }
});