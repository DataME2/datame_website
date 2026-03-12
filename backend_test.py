import requests
import sys
import json
from datetime import datetime

class DataMeAPITester:
    def __init__(self, base_url="https://migration-maestro-2.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_fields=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)
            else:
                print(f"❌ Unsupported method: {method}")
                return False, {}

            print(f"   Status Code: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Parse and validate response
                try:
                    response_data = response.json() if response.content else {}
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    
                    # Check expected fields if provided
                    if expected_fields and response_data:
                        for field in expected_fields:
                            if field not in response_data:
                                print(f"⚠️  Warning: Expected field '{field}' not found in response")
                    
                    return True, response_data
                except json.JSONDecodeError:
                    print(f"⚠️  Warning: Response is not valid JSON")
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json() if response.content else {}
                    print(f"   Error Response: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"   Raw Response: {response.text[:200]}")
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout after 10 seconds")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error (server may be down)")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "",
            200,
            expected_fields=["message"]
        )

    def test_create_lead(self, name, email, company, role, interest="maturity_assessment"):
        """Test creating a lead"""
        success, response = self.run_test(
            "Create Lead",
            "POST",
            "leads",
            200,
            data={
                "name": name,
                "email": email,
                "company": company,
                "role": role,
                "interest": interest
            },
            expected_fields=["id", "name", "email", "created_at"]
        )
        return response.get('id') if success else None

    def test_get_leads(self):
        """Test retrieving leads"""
        success, response = self.run_test(
            "Get Leads",
            "GET",
            "leads",
            200
        )
        return success, response

    def test_create_contact(self, name, email, message, company=None, service_interest=None):
        """Test creating a contact"""
        success, response = self.run_test(
            "Create Contact",
            "POST",
            "contact",
            200,
            data={
                "name": name,
                "email": email,
                "message": message,
                "company": company,
                "service_interest": service_interest
            },
            expected_fields=["id", "name", "email", "message", "created_at"]
        )
        return response.get('id') if success else None

    def test_get_contacts(self):
        """Test retrieving contacts"""
        success, response = self.run_test(
            "Get Contacts",
            "GET",
            "contacts",
            200
        )
        return success, response

    def test_invalid_requests(self):
        """Test various invalid request scenarios"""
        print(f"\n🔍 Testing Invalid Requests...")
        
        # Test missing required fields for leads
        success, _ = self.run_test(
            "Create Lead - Missing Name",
            "POST",
            "leads",
            422,  # Unprocessable Entity for validation errors
            data={"email": "test@example.com"}
        )
        
        # Test missing required fields for contacts
        success, _ = self.run_test(
            "Create Contact - Missing Message",
            "POST",
            "contact",
            422,
            data={"name": "Test", "email": "test@example.com"}
        )
        
        # Test invalid email format
        success, _ = self.run_test(
            "Create Lead - Invalid Email",
            "POST",
            "leads",
            422,
            data={"name": "Test", "email": "invalid-email"}
        )

    # Wiki Article API Tests
    def test_create_wiki_article(self, title, content, excerpt=None, category="General", tags=None, author="DataMe", read_time=None, featured_image_url=None, published=True):
        """Test creating a wiki article"""
        data = {
            "title": title,
            "content": content,
            "category": category,
            "author": author,
            "published": published
        }
        if excerpt:
            data["excerpt"] = excerpt
        if tags:
            data["tags"] = tags
        if read_time:
            data["read_time"] = read_time
        if featured_image_url:
            data["featured_image_url"] = featured_image_url

        success, response = self.run_test(
            "Create Wiki Article",
            "POST",
            "wiki/articles",
            200,
            data=data,
            expected_fields=["id", "title", "content", "category", "author", "published", "created_at"]
        )
        return response.get('id') if success else None

    def test_get_wiki_articles(self, published_only=True, category=None):
        """Test retrieving wiki articles"""
        endpoint = "wiki/articles"
        params = {}
        if category and category != "All":
            params["category"] = category
        if not published_only:
            params["published_only"] = "false"
        
        # Add query params if any
        if params:
            param_str = "&".join([f"{k}={v}" for k, v in params.items()])
            endpoint += f"?{param_str}"
            
        success, response = self.run_test(
            f"Get Wiki Articles (published_only={published_only}, category={category})",
            "GET",
            endpoint,
            200
        )
        return success, response

    def test_get_all_wiki_articles(self):
        """Test retrieving all wiki articles including drafts"""
        success, response = self.run_test(
            "Get All Wiki Articles (including drafts)",
            "GET", 
            "wiki/articles/all",
            200
        )
        return success, response

    def test_get_wiki_article_by_id(self, article_id):
        """Test retrieving a single wiki article by ID"""
        success, response = self.run_test(
            f"Get Wiki Article by ID: {article_id}",
            "GET",
            f"wiki/articles/{article_id}",
            200,
            expected_fields=["id", "title", "content", "category", "author"]
        )
        return success, response

    def test_update_wiki_article(self, article_id, update_data):
        """Test updating a wiki article"""
        success, response = self.run_test(
            f"Update Wiki Article: {article_id}",
            "PUT",
            f"wiki/articles/{article_id}",
            200,
            data=update_data,
            expected_fields=["id", "title", "content", "updated_at"]
        )
        return success, response

    def test_delete_wiki_article(self, article_id):
        """Test deleting a wiki article"""
        success, response = self.run_test(
            f"Delete Wiki Article: {article_id}",
            "DELETE",
            f"wiki/articles/{article_id}",
            200,
            expected_fields=["message"]
        )
        return success, response

    def test_get_wiki_categories(self):
        """Test retrieving wiki categories"""
        success, response = self.run_test(
            "Get Wiki Categories",
            "GET",
            "wiki/categories",
            200
        )
        return success, response

    def test_wiki_article_not_found(self):
        """Test getting non-existent wiki article"""
        fake_id = "non-existent-id-12345"
        success, response = self.run_test(
            f"Get Non-existent Wiki Article",
            "GET",
            f"wiki/articles/{fake_id}",
            404
        )
        return success

def main():
    print("🚀 Starting DataMe API Tests")
    print("=" * 50)
    
    # Setup
    tester = DataMeAPITester()
    timestamp = datetime.now().strftime('%H%M%S')
    test_name = f"test_user_{timestamp}"
    test_email = f"test_{timestamp}@example.com"
    
    # Test API Root
    success, _ = tester.test_api_root()
    if not success:
        print("❌ API Root test failed - server may be down")
        return 1

    # Test Lead Creation and Retrieval
    print(f"\n🧪 Testing Lead Management...")
    lead_id = tester.test_create_lead(
        name=test_name,
        email=test_email,
        company="Test Company",
        role="Data Engineer",
        interest="maturity_assessment"
    )
    
    if not lead_id:
        print("❌ Lead creation failed - stopping lead tests")
    else:
        print(f"✅ Lead created with ID: {lead_id}")
        
        # Test getting leads
        success, leads_data = tester.test_get_leads()
        if success and isinstance(leads_data, list):
            print(f"✅ Retrieved {len(leads_data)} leads from database")
            # Verify our lead is in the list
            our_lead = next((lead for lead in leads_data if lead.get('id') == lead_id), None)
            if our_lead:
                print(f"✅ Our created lead found in leads list")
            else:
                print(f"⚠️  Warning: Our created lead not found in leads list")
        else:
            print("❌ Failed to retrieve leads properly")

    # Test Contact Creation and Retrieval  
    print(f"\n🧪 Testing Contact Management...")
    contact_id = tester.test_create_contact(
        name=test_name,
        email=test_email,
        message="This is a test contact message for API testing.",
        company="Test Company",
        service_interest="data_governance"
    )
    
    if not contact_id:
        print("❌ Contact creation failed - stopping contact tests")
    else:
        print(f"✅ Contact created with ID: {contact_id}")
        
        # Test getting contacts
        success, contacts_data = tester.test_get_contacts()
        if success and isinstance(contacts_data, list):
            print(f"✅ Retrieved {len(contacts_data)} contacts from database")
            # Verify our contact is in the list
            our_contact = next((contact for contact in contacts_data if contact.get('id') == contact_id), None)
            if our_contact:
                print(f"✅ Our created contact found in contacts list")
            else:
                print(f"⚠️  Warning: Our created contact not found in contacts list")
        else:
            print("❌ Failed to retrieve contacts properly")

    # Test Invalid Requests
    print(f"\n🧪 Testing Error Handling...")
    tester.test_invalid_requests()

    # Test Wiki Article Management
    print(f"\n🧪 Testing Wiki Article Management...")
    
    # Test creating wiki article
    article_id = tester.test_create_wiki_article(
        title=f"Test Wiki Article {timestamp}",
        content="<h2>This is a test article</h2><p>This is some test content with <strong>bold text</strong> and <em>italic text</em>.</p>",
        excerpt="This is a test excerpt for the wiki article.",
        category="General",
        tags=["test", "api", "wiki"],
        author="Test Author",
        read_time="5 min read",
        featured_image_url="https://via.placeholder.com/800x400",
        published=True
    )
    
    if not article_id:
        print("❌ Wiki article creation failed - stopping wiki tests")
    else:
        print(f"✅ Wiki article created with ID: {article_id}")
        
        # Test getting single article
        success, article_data = tester.test_get_wiki_article_by_id(article_id)
        if success:
            print(f"✅ Successfully retrieved article by ID")
        
        # Test getting all published articles
        success, articles_data = tester.test_get_wiki_articles(published_only=True)
        if success and isinstance(articles_data, list):
            print(f"✅ Retrieved {len(articles_data)} published articles")
            # Check if our article is in the list
            our_article = next((art for art in articles_data if art.get('id') == article_id), None)
            if our_article:
                print(f"✅ Our created article found in published articles list")
            else:
                print(f"⚠️  Warning: Our created article not found in published articles")
        
        # Test getting all articles (including drafts)
        success, all_articles_data = tester.test_get_all_wiki_articles()
        if success and isinstance(all_articles_data, list):
            print(f"✅ Retrieved {len(all_articles_data)} total articles (including drafts)")
        
        # Test updating article
        update_data = {
            "title": f"Updated Test Article {timestamp}",
            "excerpt": "Updated excerpt content",
            "published": False  # Change to draft
        }
        success, updated_article = tester.test_update_wiki_article(article_id, update_data)
        if success:
            print(f"✅ Successfully updated article")
            # Verify it's now unpublished
            success, published_articles = tester.test_get_wiki_articles(published_only=True)
            if success:
                our_article_published = next((art for art in published_articles if art.get('id') == article_id), None)
                if not our_article_published:
                    print(f"✅ Article correctly unpublished - not in published articles")
                else:
                    print(f"⚠️  Warning: Article still appears in published articles after setting published=False")
        
        # Test getting categories
        success, categories = tester.test_get_wiki_categories()
        if success and isinstance(categories, list):
            print(f"✅ Retrieved {len(categories)} wiki categories: {categories}")
        
        # Test deleting article
        success, delete_response = tester.test_delete_wiki_article(article_id)
        if success:
            print(f"✅ Successfully deleted article")
            # Verify it's actually deleted
            tester.test_wiki_article_not_found()
        
    # Test wiki error scenarios
    print(f"\n🧪 Testing Wiki Error Handling...")
    tester.test_wiki_article_not_found()

    # Print final results
    print(f"\n📊 Final Test Results")
    print("=" * 50)
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        failed = tester.tests_run - tester.tests_passed
        print(f"❌ {failed} test(s) failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())