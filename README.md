## Pattern Library ! ! !
#### if you also despise video tutorials, clunky website patterns, etc. and just have a pile of horribly formatted txt files somewhere on your laptop and Google Drive because you just want the pattern information itself, same.


<img src="https://i.pinimg.com/736x/87/ec/7f/87ec7f572db6bfba36569f5cb3b8d468.jpg" width = 200>

<!-- Library View -->
### library view:
<img width="1032" height="754" alt="Screenshot 2026-06-23 at 5 12 01 AM" src="https://github.com/user-attachments/assets/cff7a1eb-382c-4e9c-bbae-f81f8aa46c09" />

<!-- Card View -->
### pattern card view:
<img width="1144" height="753" alt="Screenshot 2026-06-22 at 5 20 01 AM" src="https://github.com/user-attachments/assets/66a2f3f8-6631-4b60-ba4e-8960c8e55114" />

<!-- Add Pattern View -->
### adding new patterns:
<img width="1142" height="706" alt="Screenshot 2026-06-22 at 3 55 04 AM" src="https://github.com/user-attachments/assets/939b0c52-53ba-4dc3-9cfd-f2a60aa294bf" />

<!-- Card Editing View -->
### editing a pattern:
<img width="1105" height="753" alt="Screenshot 2026-06-23 at 5 13 59 AM" src="https://github.com/user-attachments/assets/51bb689f-7b9b-428f-9edf-904ba016cb5a" />


### Usage: TO BE UPDATED whenever i go wrangle that part of docker images idk

(insert docker commands to create venv i forgot)

source .venv/bin/activate 

uvicorn app.main:app --reload 

to view database stuff: docker exec -it pattern-api-db-1 psql -U app -d patterns
