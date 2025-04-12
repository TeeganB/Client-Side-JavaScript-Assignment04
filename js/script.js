// Dynamically Adding My strudent Name and ID number
document.addEventListener("DOMContentLoaded", () => {
    const studentId = "1263104"; 
    const studentName = "Teegan Buttigieg"; 
    const infoBtn = document.getElementById("showStudentBtn");
    const infoPara = document.getElementById("studentInfo");
  
    // Event listener to show student info when button is clicked
    infoBtn.addEventListener("click", () => {
      infoPara.textContent = `Student: ${studentName}, ID: ${studentId}`;
      infoBtn.style.display = "none"; // Optional: hide button after clicked
    });
  });
      
function searchYouTube() {
    const query = document.getElementById("searchInput").value;
    const apiKey = "AIzaSyC8_gqbgadAmOM5txA8AubcOO2AAWHhth8"; // Youtube API Key
    const maxResults = 10;
      
    // First API call: search videos by keyword
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${apiKey}`;

    fetch(searchUrl)
    .then(res => res.json())
    .then(async data => {
        // Extract video IDs from search results
        const videoIds = data.items.map(item => item.id.videoId).join(',');

        // Second API call: fetch full video details
        const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`;
        const detailsRes = await fetch(detailsUrl);
        const detailsData = await detailsRes.json();

        // Display results on the page
        displayResults(detailsData.items);
    })
    .catch(err => {
        console.error("API error:", err);
        document.getElementById("results").textContent = "Something went wrong.";
    });
}

// Function to create and display video result cards
function displayResults(videos) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    if (!videos || videos.length === 0) {
    resultsDiv.innerHTML = "<p>No videos found.</p>";
        return;
    }

    // Loop through each video and create a card
    videos.forEach(video => {
    const { id, snippet, statistics } = video;

    // Extract data
    const title = snippet.title;
    const link = `https://www.youtube.com/watch?v=${id}`;
    const channel = snippet.channelTitle;
    const thumbnail = snippet.thumbnails.high.url;
    const views = statistics.viewCount;
    const likes = statistics.likeCount;
    const publishedAt = new Date(snippet.publishedAt).toLocaleDateString();
    const description = snippet.description;
        

    // Create the card element
    const div = document.createElement("div");
    div.classList.add("result-item");

    // Fill the card with video content
    div.innerHTML = `
        <a href="${link}" target="_blank">
        <img src="${thumbnail}" alt="Thumbnail">
        <p class="video-title">${title}</p>
        </a>
        <p><strong>By:</strong> ${channel}</p>
        <p><strong>📅 Published:</strong> ${publishedAt}</p>
        <p><strong>👀 Views:</strong> ${parseInt(views).toLocaleString()}</p>
        <p><strong>👍 Likes:</strong> ${parseInt(likes).toLocaleString()}</p>
        <p class="description">${description.length > 100 ? description.substring(0, 100) + '...' : description}</p>
    `;

    resultsDiv.appendChild(div);
    });
}