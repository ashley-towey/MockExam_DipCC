# Apparent Weather Predictor

I’m a weather app obsessive. Always cross checking between different sites to get the best estimate of what the weather will be at any given time. Even to the point of checking what the weather is right now in order to know what to wear when I leave the house. This web app is for people like me, to tell them to simply look out the window, smell the air and actually exist in the world rather than through a screen based interface. The apparent weather predictor gives you entirely the wrong weather, forcing you to take matters into your own hands and go out and see the world for yourself.

This also challenges our notion that computers - or machines in general - are always correct. It is through this interaction with weather forecasts that we see this for the falsehood that it is. We can see it’s raining outside, and yet all the forecasts tell us it’s dry. Systems are only as accurate as the data that they can be fed, and having a weather station on top of every house seems unrealistic (although something in which I am considering investing). The aggregation, or averaging out, between different weather sources creates assumptions about a location based on the differences or similarities it can see between its inputs. This distinctly depersonalised approach is what creates mistakes, because the natural world doesn’t operate on such a linear scale. 

This example can also be seen in machine vision, where our inherent differences as human beings are not readable by machines unless trained specifically to do so. Creating a face tracking algorithm is limited by the number of people it is trained on, everything that happens in between is an assumption. It is through these assumptions that mistakes are made, by excluding people from systems that are created to be so-called universal, machine vision reinforces prejudices and stereotypes. 

By trying to create my own weather app I myself encountered issues with reading JSON files, and being able to manipulate them in a way in which could be human readable. This further reinforced my understanding of the gap between machine readable and human readable content. I was trying to get the current hour from an hourly forecast, but could not find the correct string in the array in a way which would update because of the way in which the files were created. This limited the number of data output variables I could use because I could only use the ‘current_weather’ section of the API. This interaction - and subsequent barrier - meant I was forced to try to find a workaround and bend myself to the output of the JSON file. 

In order to expand this project beyond its very minimal current scope I would like to increase the engagement in the surrounding context. One example would be to instruct the participant to take a photo of the weather where they are, alongside a written account of their perception of how the weather is outside today. This could then feed into a more engaged practice with the weather and how our perception of it changes over time. This would also feed into people making an engaged decision to step over the threshold and into the outside world. 
