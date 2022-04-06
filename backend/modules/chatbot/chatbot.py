import re
from unicodedata import name
from modules.chatbot import long_responses as long
from modules.google_search import google_search as google


class ChatBot:
    def message_probability(self, user_message, recognised_words, single_response=False, required_words=[]):
        message_certainty = 0
        has_required_words = True

        # Counts how many words are present in each predefined message
        for word in user_message:
            if word in recognised_words:
                message_certainty += 1

        # Calculates the percent of recognised words in a user message
        percentage = float(message_certainty) / float(len(recognised_words))

        # Checks that the required words are in the string
        for word in required_words:
            if word not in user_message:
                has_required_words = False
                break

        # Must either have the required words, or be a single response
        if has_required_words or single_response:
            return int(percentage * 100)
        else:
            return 0

    def check_all_messages(self, message):
        highest_prob_list = {}

        # Simplifies response creation / adds it to the dict
        def response(bot_response, list_of_words, single_response=False, required_words=[]):
            nonlocal highest_prob_list
            highest_prob_list[bot_response] = self.message_probability(message, list_of_words, single_response,
                                                                       required_words)

        # Responses ------------------------------------------------------------------------------------------------
        response('Hello!', ['hello', 'hi', 'hey', 'sup', 'heyo'], single_response=True)
        response('See you!', ['bye', 'goodbye'], single_response=True)
        response('I\'m doing fine, and you?', ['how', 'are', 'you', 'doing'])
        response('You\'re welcome!', ['thank', 'thanks'], single_response=True)
        response('Thank you!', ['i', 'love', 'code', 'palace'], required_words=['code', 'palace'])
        response('My Name is Quaesitor', ['what', 'is', 'your', 'name'])
        response('My name is a latin word.It means a seeker,a person who is attempting to find or obtain something.', ['what', 'is', 'the', 'meaning', 'of', 'your', 'name', 'Name'])

        # Longer responses
        response(long.R_ADVICE, ['give', 'advice'], required_words=['advice'])
        response(long.R_EATING, ['what', 'you', 'eat'], required_words=['you', 'eat'])

        best_match = max(highest_prob_list, key=highest_prob_list.get)
        # print(highest_prob_list)
        # print(f'Best match = {best_match} | Score: {highest_prob_list[best_match]}')

        return long.unknown() if highest_prob_list[best_match] < 1 else best_match

    # Used to get the response
    def get_response(self, user_input):
        split_message = re.split(r'\s+|[,;?!.-]\s*', user_input.lower())
        response = self.check_all_messages(split_message)
         
        if response in long.responses:
            result = "Below you can find the google search results:\n"

            data = google.google_search(query=user_input)

            for d in data:
                msg = "<p>%s: <a href='%s' target='_blank'>Click Here</a></p>" % (d.title, d.url)
                result = result + msg + "\n"

            return result

        return response



