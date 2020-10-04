from django.shortcuts import render


def about_view(request):
    return render(request, "core/home.html")


def chatbot_view(request):
    return render(request, 'core/chat.html')


def team_view(request):
    return render(request, 'core/team.html')


def predictions_view(request):
    return render(request, "core/predictions.html")