## Pattern Library ! ! !
#### if you also despise video tutorials, clunky website patterns, etc. and just have a pile of horribly formatted txt files somewhere on your laptop and Google Drive because you just want the pattern information itself, same.


<img src="https://i.pinimg.com/736x/87/ec/7f/87ec7f572db6bfba36569f5cb3b8d468.jpg" width = 200>

<!-- Library View -->
### library view:
<img width="1032" height="754" alt="Screenshot 2026-06-23 at 5 12 01 AM" src="https://github.com/user-attachments/assets/cff7a1eb-382c-4e9c-bbae-f81f8aa46c09" />

<!-- Card View -->
### pattern card view:
<img width="1127" height="753" alt="Screenshot 2026-06-24 at 1 23 29 PM" src="https://github.com/user-attachments/assets/81716157-9f6d-498c-8fdc-b1999e435c95" />


<!-- Working View -->
### working view with row tracker:
<img width="1114" height="753" alt="Screenshot 2026-06-24 at 1 22 22 PM" src="https://github.com/user-attachments/assets/3bddac27-f679-4fbb-92f5-607d1e8959fd" />

<!-- Add Pattern View -->
### adding new patterns:
<img width="1142" height="706" alt="Screenshot 2026-06-22 at 3 55 04 AM" src="https://github.com/user-attachments/assets/939b0c52-53ba-4dc3-9cfd-f2a60aa294bf" />

<!-- Card Editing View -->
### editing a pattern:
<img width="1102" height="752" alt="Screenshot 2026-06-24 at 1 25 42 PM" src="https://github.com/user-attachments/assets/0119f236-890d-45c8-a4d8-982dfacc69bb" />


### Usage: TO BE UPDATED whenever i go wrangle that part of docker images idk

(insert docker commands to create venv i forgot)

source .venv/bin/activate 

uvicorn app.main:app --reload 

to view database stuff: docker exec -it pattern-api-db-1 psql -U app -d patterns
