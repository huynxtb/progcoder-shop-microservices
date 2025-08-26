Using Keycloak api:
1. Create client Service Account roles Enabled
   - Set Access Type to "Service Accounts Enabled"
   - Set Authorization
1. Choose realm -> Clients -> Choose client ->  Service Accounts roles -> Assign Roles
1. Assign role to realm: realm-management manage-users


Create new Client
1. Valid redirect uri https://localhost:5000/swagger/oauth2-redirect.html for swagger
1. Web origins https://localhost:5000 for swagger


PORTS:
1. User 5000
2. Catalog 5001
3. Inventory 5002
4. Notification 5003
5. Discount 5004
6. Order 5005
7. Basket 5006
8. Payment 5007
9. Search 5008